import { Button } from "@/presentation/components/action/button";
import Link from "next/link";

export function CustomNotFound() {
  return (
    <div className="flex items-center h-screen align-middle justify-center w-full my-auto">
      <div className="px-40 py-20  rounded-md">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-red text-9xl">404</h1>

          <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            <span className="text-destructive">Salale!</span> Ukurasa haukupatikana
          </h6>

          <p className="mb-8 text-center text-gray-500 md:text-lg">
            Ukurasa huu haupatikani
          </p>

          <Link href="/home">
            <Button>Nenda Nyumbani</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
