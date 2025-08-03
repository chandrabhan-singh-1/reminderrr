import * as React from "react";
import {
  Html,
  Body,
  Container,
  Img,
  Link,
  Heading,
  Text,
  Button,
  pretty,
  render,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  name: string;
  url: string;
}

const ResetPasswordEmail = ({ name, url }: ResetPasswordEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Body>
        <Container>
          <Img
            src="/logo.svg"
            alt="Reminderrr"
            width={100}
            height={100}
            className="m-auto"
          />

          <Heading>Reset your password</Heading>
          <Text>Hello {name},</Text>
          <Text>Click the button below to reset your password:</Text>
          <Link href={url}>
            <Button>Reset password</Button>
          </Link>
          <Text>or copy and paste the link below into your browser:</Text>
          <Text>{url}</Text>
          <Text>
            If you did not request a password reset, please ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ResetPasswordEmail;
