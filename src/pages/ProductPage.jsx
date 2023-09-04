import ProductInfo from "../features/product/ProductInfo";

export default function ConfigPage() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-8 mb-8 flex flex-col gap-12">
      <header className="bg-white shadow ">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="items-center justify-between md:flex">
            <div className="max-w-lg">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Product</h3>
              <p className="text-gray-600 mt-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="mb-8 p-6">
          <ProductInfo />
        </div>
      
      </main>
    </div>
  );
}
