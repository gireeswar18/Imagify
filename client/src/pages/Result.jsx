import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext";

const Result = () => {
   const [img, setImg] = useState(assets.sample_img_1);
   const [isImageLoaded, setIsImageLoaded] = useState(false);
   const [loading, setLoading] = useState(false);
   const [input, setInput] = useState("");

   const { generateImage } = useContext(AppContext);

   const onSubmitHandler = async (e) => {
      e.preventDefault();

      if (input) {
         setLoading(true);
         const image = await generateImage(input);

        //  console.log(image);

         if (image) {
            setIsImageLoaded(true);
            setImg(image);
            setInput("");
         }

         setLoading(false);
      }
   };

   return (
      <motion.form
         initial={{ opacity: 0.2, y: 100 }}
         transition={{ duration: 1 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="flex flex-col min-h-[90vh] justify-center items-center"
         onSubmit={onSubmitHandler}
      >
         <div>
            <div className="relative">
               <img src={img} alt="img" className="max-w-sm rounded" />
               <span
                  className={`absolute bottom-0 left-0 h-1 bg-blue-500  ${
                     loading ? "w-full transition-all duration-1000" : "w-0"
                  }`}
               />
            </div>

            {loading && <p>Loading...</p>}
         </div>

         {!isImageLoaded && (
            <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm  mt-10 rounded-full">
               <input
                  type="text"
                  placeholder="Describe what you want to generate"
                  className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder:text-[#e0e0e0] placeholder:font-light"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
               />
               <button
                  type="submit"
                  className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full"
               >
                  Generate
               </button>
            </div>
         )}

         {isImageLoaded && (
            <div className="flex gap-2 flex-wrap justify-center items-center text-white text-sm p-0.5 mt-10 rounded-full">
               <p
                  className="bg-transparent border border-zinc-900 text-black cursor-pointer rounded-full px-8 py-3"
                  onClick={() => setIsImageLoaded(false)}
               >
                  Generate another
               </p>
               <a
                  href={img}
                  download
                  className="bg-zinc-900 cursor-pointer rounded-full px-10 py-3"
               >
                  Download
               </a>
            </div>
         )}
      </motion.form>
   );
};
export default Result;
