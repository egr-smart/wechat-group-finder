import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command"

export default function Home() {
  return (
    <main>
      <div className="flex justify-center ">
        <Command className="rounded-lg border shadow-md max-w-md">
          <CommandInput placeholder="Search for a group..." />
        </Command>
      </div>
    </main>
  );
}
