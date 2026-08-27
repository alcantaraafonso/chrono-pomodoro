import { Heading } from "./components/Heading";

import "./styles/theme.css";
import "./styles/global.css";
import { TimerIcon } from "lucide-react";

export function App() {
  return (
    <div>
      <Heading>
        Olá Mundo
        <button>
          <TimerIcon />
        </button>
      </Heading>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis
        voluptate harum velit dignissimos necessitatibus, iusto voluptatem
        voluptatum recusandae et, exercitationem, est corporis dicta esse sed.
        Animi autem natus doloremque nisi?
      </p>
    </div>
  );
}
