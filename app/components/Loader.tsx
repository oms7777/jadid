'use client'

import { PuffLoader } from "react-spinners"

const Loader= () => {
    return (
        <div
            className="
                h-[70vh]
                flex
                flex-col
                justify-center
                items-center
            "
        >
            <PuffLoader
                size={100}
                color="yellow-600"
            />

        </div>
    )
}

export default Loader