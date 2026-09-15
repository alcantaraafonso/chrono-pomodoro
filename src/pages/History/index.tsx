import styles from "./styles.modules.css";

import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";

export function History() {
  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          <span>
            <DefaultButton>
              <TrashIcon />
            </DefaultButton>
          </span>
        </Heading>
      </Container>
      <Container>
        <div className="responsiveTable">dasdasdsad</div>
      </Container>
    </MainTemplate>
  );
}
