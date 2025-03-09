// "use client";

// import React, { useState, useRef } from "react";
// import Image from "next/image";
// import toast from "react-hot-toast";

// type ImageGenerationResponse = {
//   data?: { url: string }[];
//   error?: { message: string };
// };

// export default function AIImageGenerator() {
//   const [loading, setLoading] = useState<string | false>(false);
//   const [b64photo, setB64photo] = useState<string | null>(null);
//   const [generatedImages, setGeneratedImages] = useState<string[]>([]);
//   const [error, setError] = useState<{ prompt?: string; error?: string }>({});
//   const textPromptRef = useRef<HTMLTextAreaElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Configuration for image generation
//   const SIZE = 1024; // or whatever size you prefer
//   const OPENAI_KEY = "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";
//   const OPENAI_ORG = "org-lHjOntuceEFomYSRXZUjKxVR";

//   // Prompt engineering function (similar to Svelte's prompt_engine)
//   const promptEngine = (textPrompt: string, textureInfo?: string): string => {
//     return textureInfo
//       ? `${textPrompt}. Incorporate the following texture characteristics: ${textureInfo}`
//       : textPrompt;
//   };

//   // Photo to text conversion
//   const photoToText = async (base64Image: string): Promise<string> => {
//     try {
//       const response = await fetch(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${OPENAI_KEY}`,
//             "OpenAI-Organization": OPENAI_ORG || "",
//           },
//           body: JSON.stringify({
//             model: "gpt-4o-mini",
//             messages: [
//               {
//                 role: "user",
//                 content: [
//                   {
//                     type: "text",
//                     text: "Summarize this texture in a way that can be used to generate visuals. Focus on its patterns, colors, material, and style. Make the description concise but detailed enough for creative applications.",
//                   },
//                   {
//                     type: "image_url",
//                     image_url: { url: base64Image },
//                   },
//                 ],
//               },
//             ],
//             max_tokens: 300,
//           }),
//         }
//       );

//       const data = await response.json();
//       return data.choices[0].message.content;
//     } catch (err) {
//       console.error("Error converting photo to text:", err);
//       throw err;
//     }
//   };

//   // Image generation
//   const generatePhoto = async (
//     textPrompt: string,
//     textureInfo?: string
//   ): Promise<ImageGenerationResponse> => {
//     try {
//       const enhancedPrompt = promptEngine(textPrompt, textureInfo);

//       const response = await fetch(
//         "https://api.openai.com/v1/images/generations",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${OPENAI_KEY}`,
//             "OpenAI-Organization": OPENAI_ORG || "",
//           },
//           body: JSON.stringify({
//             model: "dall-e-3",
//             quality: "hd",
//             prompt: enhancedPrompt,
//             n: 1,
//             size: `${SIZE}x${SIZE}`,
//           }),
//         }
//       );

//       return await response.json();
//     } catch (err) {
//       console.error("Error generating photo:", err);
//       return { error: { message: "Failed to generate image" } };
//     }
//   };

//   // Handle file upload
//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const base64 = event.target?.result as string;
//         setB64photo(base64);
//         setError({}); // Clear any previous errors
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Remove uploaded texture
//   const removeTexture = () => {
//     setB64photo(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   // Submit generation process
//   const submit = async (prompt: string) => {
//     // Validate inputs
//     if (!prompt.trim()) {
//       toast.error("Please enter a prompt");
//       return;
//     }

//     // Reset states
//     setLoading("Analyzing texture");
//     setError({});
//     setGeneratedImages([]); // Clear previous images

//     try {
//       // Analyze texture if image is uploaded
//       let textureInfo = "";
//       if (b64photo) {
//         textureInfo = await photoToText(b64photo);
//       }

//       // Generate images
//       const urls: string[] = [];
//       while (urls.length < 4) {
//         setLoading(`Generating Image (${urls.length + 1} of 4)`);
//         const resp = await generatePhoto(prompt, textureInfo);

//         if (resp.error) {
//           setLoading(false);
//           setError({ error: resp.error.message });
//           return;
//         }

//         if (resp.data?.[0]?.url) {
//           urls.push(resp.data[0].url);
//         }
//       }

//       // Reset states and update generated images
//       setLoading(false);
//       setGeneratedImages(urls);
//       setB64photo(null);
//       if (textPromptRef.current) textPromptRef.current.value = "";
//       if (fileInputRef.current) fileInputRef.current.value = "";

//       toast.success("Images generated successfully!");
//     } catch (err) {
//       setLoading(false);
//       setError({ error: "An unexpected error occurred" });
//       console.log(err);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <label className="block text-center font-medium mb-4">
//         Upload a texture & Describe your clothing idea:
//       </label>

//       <div className="flex gap-4 mb-4">
//         {/* Texture Upload */}
//         <div className="flex-1 relative">
//           <input
//             type="file"
//             accept="image/*"
//             ref={fileInputRef}
//             onChange={handleFileUpload}
//             className="hidden"
//             id="texture-upload"
//           />
//           {b64photo ? (
//             <div className="relative">
//               <div className="relative w-full aspect-square border rounded overflow-hidden mb-2">
//                 <Image
//                   src={b64photo}
//                   alt="Uploaded texture"
//                   fill
//                   className="object-cover"
//                   sizes="(max-width: 768px) 50vw, 25vw"
//                 />
//               </div>
//               <div className="flex justify-between">
//                 <button
//                   onClick={() => fileInputRef.current?.click()}
//                   className="flex-1 mr-2 p-2 border rounded hover:bg-gray-100"
//                 >
//                   Replace
//                 </button>
//                 <button
//                   onClick={removeTexture}
//                   className="flex-1 p-2 border rounded bg-red-50 text-red-600 hover:bg-red-100"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <button
//               onClick={() => fileInputRef.current?.click()}
//               className="w-full p-2 border rounded hover:bg-gray-100"
//             >
//               Upload Texture
//             </button>
//           )}
//         </div>

//         {/* Prompt Input */}
//         <div className="flex-1">
//           <textarea
//             ref={textPromptRef}
//             placeholder="Describe your clothing idea"
//             className="w-full p-2 border rounded resize-none"
//             rows={3}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 const prompt = textPromptRef.current?.value || "";
//                 submit(prompt);
//               }
//             }}
//           />
//           <button
//             onClick={() => {
//               const prompt = textPromptRef.current?.value || "";
//               submit(prompt);
//             }}
//             className="w-full p-2 mt-2 bg-black text-white rounded hover:bg-gray-800"
//           >
//             Generate
//           </button>
//         </div>
//       </div>

//       {/* Error Handling */}
//       {(error.prompt || error.error) && (
//         <div className="text-red-500 mt-4 text-center">
//           {error.prompt || error.error}
//         </div>
//       )}

//       {/* Loading State */}
//       {loading && (
//         <div className="mt-4 text-center">
//           {loading}
//           {/* You might want to add a spinner here */}
//         </div>
//       )}

//       {/* Generated Images */}
//       {generatedImages.length > 0 && (
//         <div className="mt-8">
//           <h2 className="text-center text-2xl mb-4">Generated Images</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {generatedImages.map((imageUrl, index) => (
//               <div
//                 key={index}
//                 className="relative aspect-square border rounded overflow-hidden"
//               >
//                 <Image
//                   src={imageUrl}
//                   alt={`Generated image ${index + 1}`}
//                   fill
//                   className="object-cover"
//                   sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { arrowLeft, backup, dwIcon, generateIcon, uploadIcon } from "@/image";
import ButtonWithIcon from "@/shared/ButtonWithIcon";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { addCreator, generateDesign } from "@/network/creativeSpace";
import toast from "react-hot-toast";
import LoaderSvg from "@/shared/LoaderSvg";

export default function GenerateBox() {
  const route = useRouter();
  const [generated, setGenerated] = useState<boolean>(false);
  // const [selectedId, setSelectedId] = useState<string | null>(null);
  // const [skillNeededModal, setSkillNeededModal] = useState<boolean>(false);
  const [designId, setDesignId] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [images, setImages] = useState<string>("");
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleAttach = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImages(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  //Handle generate
  const { mutateAsync, isPending } = useMutation({
    mutationFn: generateDesign,
  });
  const handleGenerate = async () => {
    if (prompt === "") {
      toast.error("please enter prompt");
    } else {
      setGenerated(true);
      const res = await mutateAsync({
        prompt: prompt,
        image: images,
      });

      if ((res && "error" in res) || (res && res.status === false)) {
        toast.error(res.message ?? "");
      } else if (res && res.data) {
        setGeneratedImages(res?.data?.images);
        setDesignId(res.data?.designId);
        if (typeof window !== "undefined") {
          localStorage.setItem("designId", res?.data?.designId);
          localStorage.setItem("prompt", prompt);
          localStorage.setItem(
            "generatedImages",
            JSON.stringify(res?.data?.images)
          );
        }
      }
    }
  };

  const [imageLoadStatus, setImageLoadStatus] = useState<
    Record<number, boolean>
  >({});

  const renderImage = (imageUrl: string, index: number) => {
    const localStorageImages = JSON.parse(
      localStorage.getItem("generatedImages") || "[]"
    );

    return (
      <div key={index} className="relative w-[220px] h-[260px]">
        {/* Low quality placeholder */}
        <img
          src={imageUrl}
          alt=""
          width={220}
          height={260}
          className={`absolute top-0 left-0 ${
            !imageLoadStatus[index] ? "blur-lg scale-110" : "hidden"
          }`}
          // quality={10}
          // priority={index < 2}
        />

        {/* High quality image */}
        <Image
          src={imageUrl}
          alt=""
          width={220}
          height={260}
          className={`transition-opacity duration-300 min-h-[26rem] ${
            imageLoadStatus[index] ? "opacity-100" : "opacity-0"
          }`}
          quality={90}
          priority={index < 2}
          onLoad={() => {
            setImageLoadStatus((prev) => ({ ...prev, [index]: true }));
          }}
          onError={(e) => {
            if (localStorageImages[index]) {
              (e.target as HTMLImageElement).src = localStorageImages[index];
            } else {
              (e.target as HTMLImageElement).src = backup;
            }
          }}
        />

        {/* Loading state */}
        {!imageLoadStatus[index] && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoaderSvg color="#000000" />
          </div>
        )}
      </div>
    );
  };

  // const renderImage = (imageUrl: string, index: number) => {
  //   const localStorageImages = JSON.parse(
  //     localStorage.getItem("generatedImages") || "[]"
  //   );
  //   return (
  //     <Image
  //       key={index}
  //       src={imageUrl}
  //       alt=""
  //       width={220}
  //       height={260}
  //       onError={(e) => {
  //         if (localStorageImages[index]) {
  //           (e.target as HTMLImageElement).src = localStorageImages[index];
  //         } else {
  //           (e.target as HTMLImageElement).src = backup;
  //         }
  //       }}
  //     />
  //   );
  // };

  //Handle add maker
  const { mutateAsync: mutateAsyncAddCreator, isPending: isPendingAddCreator } =
    useMutation({
      mutationFn: addCreator,
    });
  const handleAddCreator = async () => {
    const res = await mutateAsyncAddCreator({
      designId: designId,
      creator: "manufacturer",
    });

    if ((res && "error" in res) || (res && res.status === false)) {
      toast.error(res.message ?? "");
    } else if (res && res.data) {
      route.push("/additional-information-1");
    }
  };

  if (!generated) {
    return (
      <div className="w-[100%] px-[17rem] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center w-[100%]">
          <p className="text-center text-[3rem]">
            Welcome to your Creative Space
          </p>
          <div className="flex">
            <Image src={dwIcon} alt="" width={20} height={20} />
            <p className="text-[1.5rem] ml-[1.2rem] text-astraTextGrey">
              Design a collection using AI and bring your ideas to life
            </p>
          </div>
          <div className="flex justify-between items-center w-[100%] border border-astraSilver bg-astraGreyBg px-[3rem] py-[2rem] rounded-[1rem] mt-[5rem]">
            <div className="w-[100%]">
              <textarea
                placeholder='Enter prompt e.g. "female model wearing multi-coloured jumpsuit"'
                className="text-[1.5rem] w-[90%] bg-transparent outline-none resize-none overflow-hidden"
                rows={1}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = `${target.scrollHeight}px`;
                }}
              />
              <div
                className="flex items-center gap-x-[.7rem] mt-[1.2rem] cursor-pointer"
                onClick={handleAttach}
              >
                <Image src={uploadIcon} alt="" width={15} height={15} />
                <p className="text-[1.5rem] text-astraActionGrey">
                  Attach Fabric
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {images && (
                  <Image
                    src={images}
                    width={500}
                    height={500}
                    alt={`Uploaded image`}
                    className="w-[80px] h-[80px] object-cover rounded-md"
                  />
                )}
              </div>
            </div>
            <ButtonWithIcon
              action="Generate"
              handleClick={handleGenerate}
              loaderColor="#ffffff"
              icon={generateIcon}
              containerStyle="bg-black rounded-full  py-[1.2rem] mt-[2rem] min-w-[15rem]"
              fontStyle="text-white text-[1.5rem]"
              iconWidth="w-[2.4rem]"
            />
          </div>
          <p className="text-[1.5rem] text-astraTextGrey mt-[2rem]">
            You have <span className="text-[1.5rem] text-black">3/3 </span>free
            outfit generations
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-[100%] p-[3rem]">
        <div
          className="flex gap-x-[1rem] mb-[2rem]"
          onClick={() => setGenerated(false)}
        >
          <Image src={arrowLeft} alt="" height={24} width={24} />
          <p className="text-[1.6rem] font-bold">Go Back</p>
        </div>
        <p className="text-[1.5rem] text-astraTextGrey">Prompt:</p>
        <p className="text-[2rem] mt-[1.5rem]">{prompt}</p>
        <hr className=" mx-[3rem] mt-[2rem] mb-[4rem]" />
        <p className="text-[1.5rem] text-astraTextGrey mb-[2rem]">Results:</p>
        {isPending ? (
          <div className="flex flex-col justify-center items-center py-[4rem] ">
            <LoaderSvg color="#000000" />
            <p className="text-[1.4rem] mt-[1rem]">Loading all Images</p>
          </div>
        ) : (
          <div className="flex gap-x-[2rem]">
            {generatedImages.map((item, index) => renderImage(item, index))}
          </div>
        )}
        <div className="mx-auto w-[max-content]">
          {generatedImages.length === 2 && (
            <ButtonWithIcon
              action="Bring Your idea To Life"
              handleClick={handleAddCreator}
              loaderColor="#ffffff"
              icon={generateIcon}
              containerStyle="bg-astraBlue w-[22rem] rounded-[.5rem] py-[1.2rem] mt-[10rem] mx-auto"
              fontStyle="text-white text-[1.5rem]"
              iconWidth="w-[2.4rem]"
              animate={isPendingAddCreator}
            />
          )}
        </div>
      </div>
    );
  }
}
{
  /* <SkillNeededModal
          isVisible={skillNeededModal}
          handleCancel={() => {
            setSkillNeededModal(false);
          }}
          handleProceed={handleAddCreator}
          isLoading={isPendingAddCreator}
        >
          <div>
            {[
              {
                id: 1,
                title: "Graphic Designer",
                values: "graphicsDesigner",
                description: " ",
                icon: featuredIcon,
              },
              {
                id: 2,
                title: "Fashion Illustrator",
                values: "fashionIllustrator",
                description: " ",
                icon: featuredIcon,
              },
              {
                id: 3,
                title: "Tech Pack Designer",
                values: "techPackDesigner",
                description: " ",
                icon: featuredIcon,
              },
              {
                id: 4,
                title: "Manufacture a Sample",
                values: "manufacturer",
                description:
                  "Find a tailor or manufacturer to make a sample made",
                icon: featuredIcon,
              },
            ].map((item) => (
              <div
                key={item.id}
                className={`flex justify-between items-center p-[1.6rem] rounded-[1.2rem] border mt-[2rem] ${
                  selectedId === item.values
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedId(item.values)}
              >
                <div className="flex items-center gap-x-[1.6rem]">
                  <Image src={item.icon} alt="" width={32} height={32} />
                  <div>
                    <p className="text-[1.7rem]">{item.title}</p>
                    <p className="text-[1.4rem] text-astraTextGrey">
                      {item.description}
                    </p>
                  </div>
                </div>
                {selectedId === item.values && (
                  <Image
                    src={tickedIcon}
                    alt="Selected"
                    width={24}
                    height={24}
                  />
                )}
              </div>
            ))}
          </div>
        </SkillNeededModal> */
}
