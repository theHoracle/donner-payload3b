import Image from "next/image";
import Paragraph from "./ui/paragraph";

const TestimonialCard = () => {
  return (
    <div className="bg-blue-50 flex items-center justify-between w-full p-4 gap-4 rounded-xl">
      <div className="relative rounded-lg overflow-hidden min-w-20 aspect-[9/16] ">
        <Image
          src="/theHoracle.jpg"
          fill
          alt="User Image"
          className="object-cover object-center"
        />
      </div>
      <div className="py-8">
        <div className="my-1.5">
          <h4 className="font-medium leading-3">John Doe</h4>
          <Paragraph className="font-thin text-xs text-red-400">Donator</Paragraph>
        </div>
        <Paragraph className="font-thin text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
          eligendi. Illo neque nemo repudiandae nostrum ipsam, possimus vero
          aspernatur!
        </Paragraph>
      </div>
    </div>
  );
};

export default TestimonialCard;
