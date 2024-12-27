import { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
   const { user, setShowLogin } = useContext(AppContext);
   const navigate = useNavigate();

   const onClickHandler = () => {
      if (user) {
         navigate("/result");
      } else {
         setShowLogin(true);
      }
   };

   return (
      <motion.div
         initial={{ opacity: 0.2, y: 100 }}
         transition={{ duration: 1 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="flex flex-col justify-center items-center text-center my-20"
      >
         <motion.div
            initial={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500"
         >
            <p>Best text to image generator</p>
            <img src={assets.star_icon} alt="star_icon" />
         </motion.div>

         <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 2 }}
            className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-12 text-center"
         >
            Turn text to <span className="text-blue-600">image</span>, in
            seconds.
         </motion.h1>

         <motion.p
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-xl mx-auto mt-6"
         >
            Unleash your creativity with AI. Turn your imagination into visual
            art in seconds - just-type, and watch the magic happen.
         </motion.p>

         <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
               default: { duration: 0.5 },
               opacity: { delay: 0.8, duration: 1 },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white sm:text-lg w-auto mt-12 px-12 py-2.5 flex items-center gap-2 rounded-full shadow-md"
            onClick={onClickHandler}
         >
            Generate Images
            <img src={assets.star_group} alt="icon" className="h-6" />
         </motion.button>

         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-wrap justify-center mt-16 gap-3"
         >
            {Array(6)
               .fill("")
               .map((_, ind) => (
                  <motion.img
                     whileHover={{ scale: 1.05, duration: 1 }}
                     className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
                     src={
                        ind % 2 == 0 ? assets.sample_img_2 : assets.sample_img_1
                     }
                     key={ind}
                     width={70}
                  />
               ))}
         </motion.div>

         <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-2 text-stone-600"
         >
            Generated images from imagify
         </motion.p>
      </motion.div>
   );
};
export default Header;
