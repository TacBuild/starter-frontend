import { ethers } from 'ethers';
import type { EvmProxyMsg } from '@tonappchain/sdk';

export const CONTRACT_ADDRESS = {
  SIMPLE_MESSAGE: "0x474a33F40232bdF188D46E016ad36F517Be91Bc3",
  MESSAGE_PROXY: "0x63b9E4DAc2615104DfE0d72AC593285114aeF8cc",
  CROSS_CHAIN_LAYER: "0xAd2fBeB7CE5f6e4F9C21090C7e4018081f4b323d",
} as const;

export function createSimpleMessageTransaction(message: string): EvmProxyMsg {
  const abi = new ethers.AbiCoder();
  const encodedParameters = abi.encode(['string'], [message]);
  
  return {
    evmTargetAddress: CONTRACT_ADDRESS.SIMPLE_MESSAGE,
    methodName: 'sendMessage',
    encodedParameters
  };
}