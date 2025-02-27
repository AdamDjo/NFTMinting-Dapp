"use client";

import Image from "next/image";
import {
  ConnectButton,
  MediaRenderer,
  TransactionButton,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import { defineChain, getContract, toEther } from "thirdweb";

import { sepolia } from "thirdweb/chains";
import { getContractMetadata } from "thirdweb/extensions/common";
import {
  claimTo,
  getActiveClaimCondition,
  getTotalClaimedSupply,
  nextTokenIdToMint,
} from "thirdweb/extensions/erc721";
import { useState } from "react";

export default function Home() {
  const account = useActiveAccount();
  const chain = defineChain(sepolia);
  const [quantity, setQuantity] = useState(1);
  const contract = getContract({
    client: client,
    chain: chain,
    address: "0x2424f5B081f2045A1F4bd443217259EAB111b81b",
  });

  const { data: contractMetadata, isLoading: iscontractMetadataLoading } =
    useReadContract(getContractMetadata, {
      contract,
    });

  const { data: claimSupply, isLoading: isClaimSupplyLoading } =
    useReadContract(getTotalClaimedSupply, {
      contract,
    });
  const { data: totalNFTSupply, isLoading: isTotalNFTSupplyLoading } =
    useReadContract(nextTokenIdToMint, {
      contract,
    });

  const { data: claimCondition } = useReadContract(getActiveClaimCondition, {
    contract,
  });

  const getPrice = (quantity: number) => {
    const total =
      quantity * parseInt(claimCondition?.pricePerToken.toString() || "0");
    return toEther(BigInt(total));
  };
  return (
    <main className="p-4 pb-10 min-h-[100vh] flex  justify-center container max-w-screen-lg mx-auto">
      <div className=" text-center">
        <Header />
        <ConnectButton client={client} chain={chain} />
        <div className="flex flex-col items-center mt-4">
          {iscontractMetadataLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <MediaRenderer
                client={client}
                src={contractMetadata?.image}
              ></MediaRenderer>
              <h2 className="text-2xl font-semibold mt-4">
                {contractMetadata?.name}
              </h2>
              <p className="text-lg">{contractMetadata?.description}</p>
            </>
          )}

          {isClaimSupplyLoading || isTotalNFTSupplyLoading ? (
            <p>Loading...</p>
          ) : (
            <p className="text-lg mt-4 font-bold">
              Total NFT: {claimSupply?.toString()}/{totalNFTSupply?.toString()}
            </p>
          )}
          <div className="flex flex-row items-center justify-center my-4">
            <button
              className="bg-black text-white px-4 py-2 rounded-md mr-4"
              onClick={() => {
                setQuantity(Math.max(1, quantity - 1));
              }}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-10 text-center mx-2 rounded-md bg-black text-white"
            ></input>
            <button
              className="bg-black text-white px-4 py-2 rounded-md mr-4"
              onClick={() => {
                setQuantity(Math.min(quantity + 1, 2));
              }}
            >
              +
            </button>
          </div>
          <TransactionButton
            transaction={() =>
              claimTo({
                contract: contract,
                to: account?.address || "",
                quantity: BigInt(quantity),
              })
            }
            onTransactionConfirmed={async () => {
              alert("NFT minted successfully");
              setQuantity(1);
            }}
          >{`Mint NFT(${getPrice(quantity)}ETH)`}</TransactionButton>
        </div>
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center ">
      <Image
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />

      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        NFT Minting
        <span className="inline-block -skew-x-6 text-blue-500"> ERC20</span>
      </h1>
    </header>
  );
}
