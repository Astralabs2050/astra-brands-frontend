"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/shared/Button";
import InputField from "@/shared/InputField";
import JobFrame from "@/shared/JobFrame";
import OptionBox from "@/shared/OptionBox";
import CustomSelect from "@/shared/CustomSelectOptions";

const pieceType = ["1 Piece Look", "2 Piece Look", "3 Piece Look"] as const;
type PieceType = (typeof pieceType)[number];

type FormValues = {
  outfitName: string;
  pieceType1?: string;
  pieceCount1?: number;
  pricePerPiece1?: number;
  pieceType2?: string;
  pieceCount2?: number;
  pricePerPiece2?: number;
  pieceType3?: string;
  pieceCount3?: number;
  pricePerPiece3?: number;
};
type PieceAccumulator = {
  [key: string]: string | number;
};

export default function CreateJobOne() {
  const route = useRouter();
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedPieceType, setSelectedPieceType] = useState<PieceType | null>(
    null
  );

  const handleToggle = (item: PieceType) => {
    setSelectedPieceType(item === selectedPieceType ? null : item);
  };

  const selectedCount = parseInt(selectedPieceType?.[0] ?? "0", 10);

  const initialFormValues: FormValues = {
    outfitName: "",
    pieceType1: "",
    pieceCount1: 0,
    pricePerPiece1: 0,
    pieceType2: "",
    pieceCount2: 0,
    pricePerPiece2: 0,
    pieceType3: "",
    pieceCount3: 0,
    pricePerPiece3: 0,
  };
  const [initialValues, setInitialValues] =
    useState<FormValues>(initialFormValues);

  const register = useFormik<FormValues>({
    initialValues,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: (values) => {
      const pieces = Array.from({ length: selectedCount }, (_, i) => ({
        type: values[`pieceType${i + 1}` as keyof FormValues] as string,
        designNumber: i + 1,
        piecePrice: values[
          `pricePerPiece${i + 1}` as keyof FormValues
        ] as number,
        pieceCount: values[`pieceCount${i + 1}` as keyof FormValues] as number,
      }));
      const jobData = {
        designId: "",
        data: {
          outfitName: values.outfitName,
          pieceNumber: selectedCount,
          pieces: pieces,
          imageData: [],
          prints: [],
        },
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("storedJob", JSON.stringify(jobData));
      }
      route.push("/additional-information-2");
    },
  });

  //Restore values when reloaded
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedJobData = localStorage.getItem("storedJob");
      const generatedDesigns = localStorage.getItem("generatedImages");
      if (generatedDesigns) {
        const designData = JSON.parse(generatedDesigns);
        setGeneratedImages(designData);
      }
      console.log("Generated Images (before update):", generatedImages);
      if (storedJobData) {
        const jobData = JSON.parse(storedJobData);
        const restoredValues: FormValues = {
          outfitName: jobData.data.outfitName || "",
          ...jobData.data.pieces.reduce(
            (
              acc: PieceAccumulator,
              piece: { type: string; pieceCount: number; piecePrice: number },
              index: number
            ) => {
              acc[`pieceType${index + 1}`] = piece.type || "";
              acc[`pieceCount${index + 1}`] = piece.pieceCount || 0;
              acc[`pricePerPiece${index + 1}`] = piece.piecePrice || 0;
              return acc;
            },
            {}
          ),
        };
        setInitialValues(restoredValues);
        setSelectedPieceType(jobData.data.pieceNumber.toString());
      }
    }
  }, []);

  return (
    <JobFrame
      title="Additional information"
      description="Enter more information for a maker to turn your AI design into a real outfit"
      pageNumber="1/3"
      link="/generate-designs"
    >
      <div>
        <div className="flex gap-x-[2rem] w-[max-content] mx-auto mt-[7rem]">
          {generatedImages &&
            generatedImages.map((item, index) => (
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
              <CustomSelect
                options={[
                  {
                    value: "shirt",
                    label: "Shirts",
                    description: "All type of Shirts",
                  },
                  {
                    value: "Denim",
                    label: "Denim",
                    description: "Denim materials ",
                  },
                  {
                    value: "Cargos",
                    label: "Cargos",
                    description: "Cargo pants",
                  },
                  {
                    value: "Head Wears",
                    label: "Head Wears",
                    description:
                      "All type of facecaps; Baseball caps, bucket hats",
                  },
                  {
                    value: "Shoes",
                    label: "Shoes",
                    description: "All type of footwears",
                  },
                  {
                    value: "Jackets",
                    label: "Jackets",
                    description: "Puff Jacket, Leather Jacket, Fleece Jacket",
                  },
                ]}
                placeholder="Select Piece type"
                label="Select Piece Type"
                disabled={false}
                value={register.values[`pieceType${i + 1}` as keyof FormValues]}
                onChange={(value) =>
                  register.setFieldValue(`pieceType${i + 1}`, value)
                }
                name={`pieceType${i + 1}`}
              />
              <div className="flex justify-between mt-[1rem] w-[100%]">
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
                    Enter Budget per Piece
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
            handleClick={register.handleSubmit}
            rounded
          />
        </div>
      </div>
    </JobFrame>
  );
}
