"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/shared/Button";
import InputField from "@/shared/InputField";
import JobFrame from "@/shared/JobFrame";
import OptionBox from "@/shared/OptionBox";
import { sample1, sample2, sample3, sample4 } from "@/image";

const pieceType = ["1 Piece Look", "2 Piece Look", "3 Piece Look"] as const;
type PieceType = (typeof pieceType)[number];

type FormValues = {
  outfitName: string;
  pieceType1?: string;
  pieceCount1?: string;
  pricePerPiece1?: string;
  pieceType2?: string;
  pieceCount2?: string;
  pricePerPiece2?: string;
  pieceType3?: string;
  pieceCount3?: string;
  pricePerPiece3?: string;
};

export default function CreateJobOne() {
  const route = useRouter();
  const [selectedPieceType, setSelectedPieceType] = useState<PieceType | null>(
    null
  );

  const handleToggle = (item: PieceType) => {
    setSelectedPieceType(item === selectedPieceType ? null : item);
  };

  const selectedCount = parseInt(selectedPieceType?.[0] ?? "0", 10);

  const initialValues: FormValues = {
    outfitName: "",
    pieceType1: "",
    pieceCount1: "",
    pricePerPiece1: "",
    pieceType2: "",
    pieceCount2: "",
    pricePerPiece2: "",
    pieceType3: "",
    pieceCount3: "",
    pricePerPiece3: "",
  };

  const register = useFormik<FormValues>({
    initialValues,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: () => {},
  });

  return (
    <JobFrame
      title="Additional information"
      description="Enter more information for your Digital Artist to Turn this into 3D"
      pageNumber="1/3"
      link="/generate-designs"
    >
      <div>
        <div className="flex gap-x-[2rem] w-[max-content] mx-auto mt-[7rem]">
          {[sample1, sample2, sample3, sample4].map((item, index) => (
            <Image key={index} src={item} alt="" width={220} height={260} />
          ))}
        </div>
        <div className="mt-[5rem] w-[50%] mx-auto">
          <p className="text-[1.4rem] pb-[.5rem]">Name of Outfit</p>
          <InputField
            type="text"
            error={null}
            placeholder="Give your look a name"
            name="outfitName"
            value={register.values.outfitName}
            borderRadius="rounded-full"
            fontSize="text-[1.8rem]"
            onChange={register.handleChange}
            onBlur={register.handleBlur}
          />
          <p className="mt-[3rem] text-[1.4rem] pb-[.5rem]">
            How many pieces are in this look?
          </p>
          <div className="flex gap-x-[1.5rem] mb-[3rem]">
            {pieceType.map((item) => (
              <OptionBox
                key={item}
                text={item}
                ticked={selectedPieceType === item}
                onClick={() => handleToggle(item)}
              />
            ))}
          </div>
          {Array.from({ length: selectedCount }, (_, i) => (
            <div key={i}>
              <p className="text-[2rem] font-bold mb-[1.5rem]">Piece {i + 1}</p>
              <p className="text-[1.4rem]">Select Piece Type</p>
              <InputField
                type="text"
                error={null}
                placeholder="Select Piece Type"
                {...register.getFieldProps(`pieceType${i + 1}`)}
                borderRadius="rounded-full"
                fontSize="text-[1.5rem]"
                marginBottom="mb-[1rem]"
              />
              <div className="flex justify-between w-[100%]">
                <div className="w-[48%]">
                  <p className="text-[1.3rem] pb-[.5rem]">
                    How many pieces of this design will you make?
                  </p>
                  <InputField
                    type="text"
                    error={null}
                    placeholder="Enter number of available stock"
                    {...register.getFieldProps(`pieceCount${i + 1}`)}
                    borderRadius="rounded-full"
                    fontSize="text-[1.5rem]"
                  />
                </div>
                <div className="w-[48%]">
                  <p className="text-[1.3rem] pb-[.5rem]">
                    Enter Price per Piece
                  </p>
                  <InputField
                    type="text"
                    error={null}
                    placeholder="$ 1.00"
                    {...register.getFieldProps(`pricePerPiece${i + 1}`)}
                    borderRadius="rounded-full"
                    fontSize="text-[1.5rem]"
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            width="w-[80%] mx-auto"
            action="Next"
            fontSize="text-[1.5rem]"
            handleClick={() => route.push("/additional-information-2")}
            rounded
          />
        </div>
      </div>
    </JobFrame>
  );
}
