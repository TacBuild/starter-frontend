"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTonConnect } from "@/hooks/use-ton-connect";
import { SendToBack } from "lucide-react";

export function CrossChainMessageButton() {
  const { connected } = useTonConnect();

  const handleClick = () => {
    if (!connected) return;
    // TODO: Implement cross-chain message functionality
    console.log("Sending cross-chain message...");
  };

  if (!connected) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <Button size="lg" disabled>
              <SendToBack className="w-4 h-4" />
              Send Cross-Chain Message
            </Button>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Connect TON Wallet</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Button size="lg" onClick={handleClick}>
      <SendToBack className="w-4 h-4" />
      Send Cross-Chain Message
    </Button>
  );
}