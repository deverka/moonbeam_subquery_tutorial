import { Account, Approval, Collator, Transaction } from "../types";
import {
  FrontierEvmEvent,
  FrontierEvmCall,
} from "@subql/frontier-evm-processor";
import { BigNumber } from "ethers";
import {SubstrateEvent, SubstrateExtrinsic} from "@subql/types";

// Setup types from ABI
type TransferEventArgs = [string, string, BigNumber] & {
  from: string;
  to: string;
  value: BigNumber;
};
type ApproveCallArgs = [string, BigNumber] & {
  _spender: string;
  _value: BigNumber;
};

// Create Transaction
export async function handleFrontierEvmEvent(
  event: FrontierEvmEvent<TransferEventArgs>
): Promise<void> {
  
  // Get data from the event 
  const from =  event.args.from
  const to = event.args.to;
  
  // Ensure account entities exist
  const fromAccount = await Account.get(from);
    if (!fromAccount) {
        await new Account(from).save();
    }
    
    const toAccount = await Account.get(to);
    if (!toAccount) {
        await new Account(to).save();
    }

  // Create new transaction entity
  const transaction = new Transaction(event.transactionHash);

  transaction.value = event.args.value.toBigInt();
  transaction.fromId = from;
  transaction.toId = to;
  transaction.contractAddress = event.address;

  await transaction.save();
}

// Create Approval
export async function handleFrontierEvmCall(
  event: FrontierEvmCall<ApproveCallArgs>
): Promise<void> {
  const approval = new Approval(event.hash);

  approval.owner = event.from;
  approval.value = event.args._value.toBigInt();
  approval.spender = event.args._spender;
  approval.contractAddress = event.to;

  await approval.save();
}

// Create Collator
export async function collatorJoined(
  event: SubstrateEvent): Promise<void> {

  const address = event.extrinsic.extrinsic.signer.toString();
  const collator = Collator.create({
      id: address,
      joinedDate: event.block.timestamp
  });

  await collator.save();
}

// Update Collator
export async function collatorLeft(
  call: SubstrateExtrinsic): Promise<void> {

  const address = call.extrinsic.signer.toString();
  const collator = await Collator.get(address);

  if (!collator) {
      // Collator doesn't exist
  } else {
      collator.leaveDate = call.block.timestamp
  }

  await collator.save();

}
