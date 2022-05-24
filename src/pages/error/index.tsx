import error from "next/error";

export default function Error() {
  console.log(error);
  return <h1>Error</h1>;
}
