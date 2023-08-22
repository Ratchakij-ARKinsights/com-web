import jsonData from '../data/tableItems.json'

export default function HomePage() {
  const tableItems = jsonData.tableItems;
  const posts = jsonData.posts;
  return (
    <>
      <header className="bg-slate-300 shadow text-center">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

          {/* <!-- Content Header --> */}
          <div className="items-center justify-between md:flex">
            <div className="max-w-lg">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                Team members
              </h3>
              <p className="text-gray-600 mt-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>
            <div className="mt-3 md:mt-0">
              <button
                className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
              >
                Add member
              </button>
            </div>
          </div>

          <div className="px-4 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              {/* Content */}
              {/* <div className="max-w-screen-xl mx-auto px-4 md:px-8"> */}
              <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                  <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                    <tr>
                      <th className="py-3 px-6">Username</th>
                      <th className="py-3 px-6">Email</th>
                      <th className="py-3 px-6">Position</th>
                      <th className="py-3 px-6">Salary</th>
                      <th className="py-3 px-6"></th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 divide-y">
                    {
                      tableItems.map((item, id) => (
                        <tr key={id}>
                          <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.position}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.salary}</td>
                          <td className="text-right px-6 whitespace-nowrap">
                            <button className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                              Edit
                            </button>
                            <button className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              {/* </div> */}
            </div>
          </div>
          {/* <!-- /End replace --> */}
          {/* /////////////////////////////////////////////////////////// */}
          <div className=" mt-10 grid gap-2 lg:grid-cols-4">
            {posts.map((items, key) => (
              <div className="w-full rounded-lg shadow-md lg:max-w-sm" key={key}>
                <img
                  className="object-cover w-full h-48"
                  src={items.img}
                  alt="image"
                />
                <div className="p-4">
                  <h4 className="text-xl font-semibold text-blue-600">

                    {items.title}
                  </h4>
                  <p className="mb-2 leading-normal">
                    {items.content}
                  </p>
                  <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
                    Read more
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
