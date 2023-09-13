import AgentInfo from "../features/agent/AgentInfo";
import Datepicker from "react-tailwindcss-datepicker";
export default function AgentPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-8 mb-8 flex flex-col gap-12">
        <header className="bg-white shadow ">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="items-center justify-between md:flex">
              <div className="max-w-lg">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Agent</h3>
                <p className="text-gray-600 mt-2">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
              </div>
              <div className="mt-3 md:mt-0">
                <button className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm">
                  Add Member
                </button>
              </div>
            </div>
          </div>
        </header>

        <AgentInfo />
      </div>
    </>
  );
}
