"use client";

import { useState, useEffect } from "react";
import { OperationTracker, SimplifiedStatuses, type TransactionLinker } from "@tonappchain/sdk";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, XCircle, Search } from "lucide-react";

interface TransactionTrackerProps {
  transactionLinker: TransactionLinker | null;
  onClose: () => void;
}

export function TransactionTracker({ transactionLinker, onClose }: TransactionTrackerProps) {
  const [status, setStatus] = useState<SimplifiedStatuses | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [operationId, setOperationId] = useState<string | null>(null);

  useEffect(() => {
    if (!transactionLinker) return;

    const trackTransaction = async () => {
      setIsTracking(true);
      
      try {
        const tracker = new OperationTracker();
        const opId = await tracker.getOperationId(transactionLinker);
        setOperationId(opId);

        // Poll for status updates
        const pollStatus = async () => {
          try {
            const currentStatus = await tracker.getSimplifiedOperationStatus(opId);
            setStatus(currentStatus);
            
            // Continue polling if still pending
            if (currentStatus === SimplifiedStatuses.PENDING) {
              setTimeout(pollStatus, 5000); // Poll every 5 seconds
            } else {
              setIsTracking(false);
            }
          } catch (error) {
            console.error("Error polling transaction status:", error);
            setIsTracking(false);
          }
        };

        await pollStatus();
      } catch (error) {
        console.error("Error tracking transaction:", error);
        setIsTracking(false);
      }
    };

    trackTransaction();
  }, [transactionLinker]);

  if (!transactionLinker) return null;

  const getStatusIcon = () => {
    switch (status) {
      case SimplifiedStatuses.SUCCESSFUL:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case SimplifiedStatuses.FAILED:
        return <XCircle className="w-5 h-5 text-red-500" />;
      case SimplifiedStatuses.PENDING:
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Search className="w-5 h-5 text-gray-500 animate-spin" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case SimplifiedStatuses.SUCCESSFUL:
        return "Transaction Successful";
      case SimplifiedStatuses.FAILED:
        return "Transaction Failed";
      case SimplifiedStatuses.PENDING:
        return "Transaction Pending";
      case SimplifiedStatuses.OPERATION_ID_NOT_FOUND:
        return "Operation Not Found";
      default:
        return "Tracking Transaction...";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case SimplifiedStatuses.SUCCESSFUL:
        return "text-green-700 bg-green-50 border-green-200";
      case SimplifiedStatuses.FAILED:
        return "text-red-700 bg-red-50 border-red-200";
      case SimplifiedStatuses.PENDING:
        return "text-yellow-700 bg-yellow-50 border-yellow-200";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Transaction Status</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>
        
        <div className={`flex items-center gap-3 p-4 rounded-lg border ${getStatusColor()}`}>
          {getStatusIcon()}
          <div className="flex-1">
            <p className="font-medium">{getStatusText()}</p>
            {operationId && (
              <p className="text-sm opacity-75 mt-1">
                ID: {operationId.slice(0, 8)}...{operationId.slice(-8)}
              </p>
            )}
          </div>
        </div>

        {status === SimplifiedStatuses.PENDING && (
          <p className="text-sm text-gray-600 mt-3 text-center">
            This may take a few minutes to complete...
          </p>
        )}

        <div className="flex gap-2 mt-4">
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={onClose}
            disabled={isTracking && status === SimplifiedStatuses.PENDING}
          >
            {isTracking && status === SimplifiedStatuses.PENDING ? "Tracking..." : "Close"}
          </Button>
          {operationId && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigator.clipboard.writeText(operationId)}
            >
              Copy ID
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}