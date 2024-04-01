"use client";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Nav() {
    const currentPath = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    return (
        <nav className="p-4 bg-teal-900 flex justify-between items-center sticky top-0">
            {
                currentPath === "/" && (
                    <>
                        <Link href="/" className="text-white font-semibold">My Contacts</Link>
                        <Link href="/contact/create" className="bg-white py-1 px-2 bg-opacity-30 hover:bg-opacity-40 transition-all rounded-md text-white">Create Contact</Link>
                    </>
                )
            }

            {
                currentPath === "/contact/create" && (
                    <>
                        <Link href="/" className="bg-white py-1 px-2 bg-opacity-30 hover:bg-opacity-40 transition-all rounded-md text-white"><ChevronLeftIcon className="text-white w-6 h-6" /></Link>
                    </>
                )
            }

            {
                currentPath !== "/" && currentPath !== "/contact/create" && currentPath.includes("/contact/") && (
                    <>
                        {
                            searchParams.get("edit") === "true" ? (
                                <>
                                    <button onClick={() => router.push(currentPath)} className="bg-white py-1 px-2 bg-opacity-30 hover:bg-opacity-40 transition-all rounded-md text-white"><ChevronLeftIcon className="text-white w-6 h-6" /></button>
                                </>
                            ) : (
                                <>
                                    <Link href="/" className="bg-white py-1 px-2 bg-opacity-30 hover:bg-opacity-40 transition-all rounded-md text-white"><ChevronLeftIcon className="text-white w-6 h-6" /></Link>
                                    <button onClick={() => router.push(`${currentPath}?edit=true`)} className="bg-white py-1 px-2 bg-opacity-30 hover:bg-opacity-40 transition-all rounded-md text-white">Edit</button>
                                </>
                            )
                        }
                    </>
                )
            }
        </nav>
    )
}

export default Nav