import * as React from "react";
import {
  Html,
  Container,
  Img,
  Link,
  Heading,
  Text,
  Button,
  render,
  pretty,
} from "@react-email/components";

interface UserVerificationEmailProps {
  name: string;
  url: string;
}

const UserVerificationEmail = ({ name, url }: UserVerificationEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Button href={url}>Click me</Button>
    </Html>
  );
};

export default UserVerificationEmail;
