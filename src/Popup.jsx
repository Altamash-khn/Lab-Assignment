import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
const options = [
  {
    label: "First Name",
    value: "first_name",
  },
  {
    label: "Last Name",
    value: "last_name",
  },
  {
    label: "Gender",
    value: "gender",
  },
  {
    label: "Age",
    value: "age",
  },
  {
    label: "Account Name",
    value: "account_name",
  },
  {
    label: "City",
    value: "city",
  },
  {
    label: "State",
    value: "state",
  },
];

export default function DialogDemo() {
  const [selectedSchema, setSelectedSchema] = useState({});
  const [selectedSchemasList, setSelectedSchemasList] = useState([]);
  const [unselectedOptions, setUnselectedOptions] = useState(options);
  const [selectValue, setSelectValue] = useState("");
  const [segmentName, setSegmentName] = useState("");

  function handleSelectChange(e) {
    const value = e.target.value;
    const selectedItem = options.find((opt) => opt.value === value);
    setSelectedSchema(selectedItem);
    setSelectValue(value);
  }

  function addSchema() {
    if (selectedSchema && selectedSchema.value) {
      setSelectedSchemasList([...selectedSchemasList, selectedSchema]);
      setSelectedSchema({});
      setUnselectedOptions((prev) =>
        prev.filter((opt) => opt.value !== selectedSchema.value)
      );
      setSelectValue("");
    }
  }

  function removeSchema(value) {
    setSelectedSchemasList((prev) =>
      prev.filter((item) => item.value !== value)
    );
    setUnselectedOptions((prev) => {
      const removedItem = selectedSchemasList.find(
        (item) => item.value === value
      );
      return [...prev, removedItem].sort((a, b) =>
        a.label.localeCompare(b.label)
      );
    });
  }

  function sentData(){
    fetch('https://webhook.site/c99f5702-b2b2-41a2-a45b-f9d333ca701a', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        segment_name: segmentName,
        schema: selectedSchemasList,
      }),
    })
  }

  return (
    <Dialog>
      <form className="h-[100vh] bg-gradient-to-b from-gray-500 via-gray-400 to-gray-100 p-0">
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border-2 bg-transparent text-white hover:bg-transparent hover:text-white font-normal rounded-none  mt-10 ml-5"
          >
            Save Segment
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>&lt; Saving Segment</DialogTitle>
          </DialogHeader>
          <div>
            <label htmlFor="segmentName" className="block text-gray-900 mb-3">
              Enter the name of the segment
            </label>
            <input
              id="segmentName"
              type="text"
              placeholder="Name of the Segment"
              className="border w-full p-2 rounded-sm"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
          </div>
          <p>
            To save your segment, you need to add the schema to build your query
          </p>
          <div
            className={` ${
              selectedSchemasList.length > 0
                ? "border border-blue-700  px-2 py-4"
                : ""
            } flex flex-col gap-2`}
          >
            {selectedSchemasList.map((item, index) => {
              return (
                <div className="flex gap-2">
                  <select className="border py-2 px-1 flex-1" key={index}>
                    <option value={item.value}>{item.label}</option>
                    {unselectedOptions.map((opt, idx) => {
                      return (
                        <option value={opt.value} key={idx}>
                          {opt.label}
                        </option>
                      );
                    })}
                  </select>
                  <button
                    onClick={() => removeSchema(item.value)}
                    className="bg-gray-200 text-gray-600 px-5 py-1 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                </div>
              );
            })}
          </div>
          <select
            className="border p-2"
            onChange={handleSelectChange}
            value={selectValue}
          >
            <option value="">Add schema to the segment</option>
            {unselectedOptions.map((item, index) => {
              return (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              );
            })}
          </select>
          <button
            className="text-left text-[#0ca678] hover:cursor-pointer"
            onClick={addSchema}
          >
            +{" "}
            <span className="border-b border-[#0ca678] pb-1">
              {" "}
              Add new schema{" "}
            </span>
          </button>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button variant="outline" className="bg-[#0ca678] text-white" onClick={sentData}>Save the Segment</Button>
            </DialogClose>
          </DialogFooter>{" "}
        </DialogContent>
      </form>
    </Dialog>
  );
}
