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
    Value: "first_name",
  },
  {
    label: "Last Name",
    Value: "last_name",
  },
  {
    label: "Gender",
    Value: "gender",
  },
  {
    label: "Age",
    Value: "age",
  },
  {
    label: "Account Name",
    Value: "account_name",
  },
  {
    label: "City",
    Value: "city",
  },
  {
    label: "State",
    Value: "state",
  },
];

export default function DialogDemo() {
  const [selectedSchema, setSelectedSchema] = useState({});
  const [selectedSchemasList, setSelectedSchemasList] = useState([]);

  function handleSelectChange(e) {
    const value = e.target.value;
    const selectedItem = options.find((opt) => opt.Value === value);
    console.log(selectedItem.Value);
  }

  function addSchema() {
    if (selectedSchema && selectedSchema.Value) {
      setSelectedSchemasList(...selectedSchemasList, selectedSchema);
      setSelectedSchema({});
    }
  }

  useEffect(() => {
    console.log("selectedSchemasList", selectedSchemasList);
  }, [selectedSchemasList]);
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
            />
          </div>
          <p>
            To save your segment, you need to add the schema to build your query
          </p>
          <div className="border border-blue-700">
            {selectedSchemasList.map((item, index) => {
              return <p>{item.Value}</p>;
            })}
          </div>
          <select className="border p-2" onChange={handleSelectChange}>
            <option>Add schema to the segment</option>
            {options.map((item, index) => {
              return (
                <option value={item.Value} key={index}>
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
              <Button variant="outline">Save the Segment</Button>
            </DialogClose>
            <Button type="submit">Cancel</Button>
          </DialogFooter>{" "}
        </DialogContent>
      </form>
    </Dialog>
  );
}
