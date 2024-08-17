import { IProduct } from "../../../interfaces/IProduct"
import { IProductVariant } from "../../../interfaces/IProductVariant"

interface ProductTableRowProps {
    index?: number
    product?: IProduct
}

export default function ProductTableRow({ index, product }: ProductTableRowProps) {
    return (
        <>
            <tr>
                <th>
                    {index}
                </th>
                <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                                <img
                                    src={product?.productImages[0].imageUrl}
                                    alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{product?.name}</div>
                            <div className="text-sm opacity-50">{product?.description}</div>
                        </div>
                    </div>
                </td>
                <td>
                    Zemlak, Daniel and Leannon
                    <br />
                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                </td>
                <td>Purple</td>
                <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                </th>
            </tr>
        </>
    )
}