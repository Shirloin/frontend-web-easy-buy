import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function ProductImageForm() {
    return (
        <>
            <div className="shadow-all-sides mt-4 flex w-full flex-col gap-6 rounded-md p-6">
                <div className="flex items-start gap-10">
                    <div className="max-w-60">
                        <h1 className="font-bold">Product Images</h1>
                        <p className="text-xs">
                            Photo format must be .jpg, .jpeg, .png and the size min.300 x 300
                            px.
                        </p>
                    </div>
                    <div className="w-full flex flex-wrap gap-4">
                        <ProductImageSelector />
                    </div>
                </div>
            </div>
        </>
    );
}

function ProductImageSelector() {
    return (
        <>
            <label className="flex h-28 w-28 flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-center hover:cursor-pointer hover:border-primary">
                <input className="hidden" type="file" accept="image/*" />
                <MdOutlineAddPhotoAlternate className="h-8 w-8" />
                <p className="font-semibold">Photo 1</p>
            </label>
        </>
    );
}
