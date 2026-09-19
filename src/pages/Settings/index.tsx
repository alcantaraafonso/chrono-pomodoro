import styles from "./styles.module.css";

import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";
import { SettingsForm } from "../../components/FormSettings";

export function Settings() {
  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>
      <Container>
        <p className={styles.txt}>Modifique as Configuracoes</p>
      </Container>
      <Container>
        <SettingsForm />
      </Container>
    </MainTemplate>
  );
}
