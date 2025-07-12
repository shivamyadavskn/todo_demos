"use client";
import { X } from "lucide-react";
import { FormEvent, useState, useRef } from "react";

export default function InputFieldCard() {
  const [skills] = useState<string[]>([
    "reactjs",
    "mysql",
    "mongodb",
    "nodejs",
    "flutter",
    "nextjs",
    "typescript",
  ]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [openDrop, setOpenDrop] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleOnChange(e: FormEvent<HTMLInputElement>) {
    const value = (e.target as HTMLInputElement).value;
    const result = skills.filter((item) =>
      item.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestedSkills(result);
  }

  function handleSelectSkill(skill: string) {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev : [...prev, skill]
    );
    setSuggestedSkills([]);
    setOpenDrop(false);
    if (inputRef.current) {
      inputRef.current.value = ""; // clear input
    }
  }

  function handleRemoveSkill(skill: string) {
    setSelectedSkills((prev) => prev.filter((item) => item !== skill));
  }

  return (
    <div className="grid grid-cols-1 grid-rows-1 place-items-center ring-4 ring-red-400 h-[95vh]">
      <div className="ring-1 p-4 w-full max-w-xl">
        <div className="text-xl font-bold text-center">Input Card</div>
        <form className="my-3">
          <div className="flex place-items-center gap-2 relative">
            <label>Technical Skills:</label>
            <input
              ref={inputRef}
              className="ring-1 rounded-md my-3 p-1 w-full"
              placeholder="Enter a skill"
              onChange={handleOnChange}
              onClick={() => setOpenDrop(true)}
              onBlur={() => setTimeout(() => setOpenDrop(false), 100)} // Delay for onClick to work
            />
            {openDrop && suggestedSkills.length > 0 && (
              <div className="absolute top-full mt-1 left-0 w-full bg-white shadow-md rounded-md z-20 max-h-40 overflow-y-auto">
                {suggestedSkills.map((suggest, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectSkill(suggest)}
                  >
                    {suggest}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Skill Cards */}
          <div className="ring-1 ring-gray-300 rounded-md grid grid-cols-3 gap-2 p-4">
            {selectedSkills.map((skill, idx) => (
              <div
                key={idx}
                className="p-2 ring-1 ring-red-300 w-fit rounded-sm flex items-center gap-2"
              >
                <div className="text-sm">{skill}</div>
                <X
                  className="w-4 h-4 ring-1 rounded-full hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleRemoveSkill(skill)}
                />
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
