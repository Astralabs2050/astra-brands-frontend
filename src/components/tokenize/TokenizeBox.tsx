"use client";
import {
  coinBaseLogo,
  ethereumLogo,
  flowLogo,
  FormaticLogo,
  metaMaskLogo,
  tezozLogo,
  TorusLogo,
} from "@/image";
import Button from "@/shared/Button";
import ButtonWithIcon from "@/shared/ButtonWithIcon";

export default function TokenizeBox() {
  return (
    <div className="w-[100%]">
      <div className="my-[4rem] flex w-[max-content] mx-auto">
        <ButtonWithIcon
          action="Ethereum"
          handleClick={() => {}}
          loaderColor="#ffffff"
          icon={ethereumLogo}
          containerStyle="bg-white  p-[1.5rem] w-[max-content] "
          fontStyle="text-astraLightBlack font-bold text-[1.4rem]"
          iconWidth="w-[1.6rem]"
        />
        <ButtonWithIcon
          action="Tezos"
          handleClick={() => {}}
          loaderColor="#ffffff"
          icon={tezozLogo}
          containerStyle="bg-white  p-[1.5rem] w-[max-content] "
          fontStyle="text-astraLightBlack font-bold text-[1.4rem]"
          iconWidth="w-[1.6rem]"
        />
        <ButtonWithIcon
          action="Flow"
          handleClick={() => {}}
          loaderColor="#ffffff"
          icon={flowLogo}
          containerStyle="bg-white  p-[1.5rem] w-[max-content] "
          fontStyle="text-astraLightBlack font-bold text-[1.4rem]"
          iconWidth="w-[1.6rem]"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-y-[.8rem]">
        <ButtonWithIcon
          action="Metamask"
          handleClick={() => {}}
          loaderColor="#ffffff"
          icon={metaMaskLogo}
          containerStyle="bg-white rounded-full p-[1.5rem] w-[40rem] border border-astraBorderGrey"
          fontStyle="text-astraLightBlack font-bold text-[1.4rem]"
          iconWidth="w-[1.6rem]"
        />
        <ButtonWithIcon
          action="Coinbase Wallet"
          handleClick={() => {}}
          loaderColor="#ffffff"
          icon={coinBaseLogo}
          containerStyle="bg-white rounded-full p-[1.5rem] w-[40rem] border border-astraBorderGrey"
          fontStyle="text-astraLightBlack font-bold text-[1.4rem]"
          iconWidth="w-[1.6rem]"
        />
        <ButtonWithIcon
          action="Torus"
          handleClick={() => {}}
          loaderColor="#ffffff"
          icon={TorusLogo}
          containerStyle="bg-white rounded-full p-[1.5rem] w-[40rem] border border-astraBorderGrey"
          fontStyle="text-astraLightBlack font-bold text-[1.4rem]"
          iconWidth="w-[1.6rem]"
        />
        <ButtonWithIcon
          action="Fortmatic"
          handleClick={() => {}}
          loaderColor="#ffffff"
          icon={FormaticLogo}
          containerStyle="bg-white rounded-full p-[1.5rem] w-[40rem] border border-astraBorderGrey"
          fontStyle="text-astraLightBlack font-bold text-[1.4rem]"
          iconWidth="w-[1.6rem]"
        />
        <button className="bg-white rounded-full p-[1.5rem] w-[40rem] border border-astraBorderGrey text-astraLightBlack font-bold text-[1.4rem]">
          Show more options
        </button>
        <div className="mt-[7rem] flex justify-between w-[50%] mx-auto ">
          <div className="w-[48%]">
            <Button
              action="Skip for now"
              fontSize="text-[1.4rem]"
              width="w-[100%]"
              handleClick={() => {}}
              inverse
              rounded
            />
          </div>
          <div className="w-[48%]">
            <Button
              action="Continue"
              fontSize="text-[1.4rem]"
              width="w-[100%]"
              handleClick={() => {}}
              rounded
            />
          </div>
        </div>
      </div>
    </div>
  );
}
