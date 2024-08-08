import { observer } from "mobx-react";
import Image from "next/image";
import { useTheme } from "next-themes";
// types
import {
  TGetBaseAuthenticationModeProps,
  TInstanceAuthenticationMethodKeys,
  TInstanceAuthenticationModes,
} from "@plane/types";
// components
import { AuthenticationMethodCard } from "@/components/authentication";
import { OpenIDConnectConfiguration } from "@/components/authentication/oidc-config";
// helpers
import { UpgradeButton } from "@/components/common/upgrade-button";
import { getBaseAuthenticationModes } from "@/helpers/authentication.helper";
// images
import OIDCLogo from "@/public/logos/oidc-logo.svg";
import SAMLLogo from "@/public/logos/saml-logo.svg";

export type TAuthenticationModeProps = {
  disabled: boolean;
  updateConfig: (key: TInstanceAuthenticationMethodKeys, value: string) => void;
};

// Authentication methods
export const getAuthenticationModes: (props: TGetBaseAuthenticationModeProps) => TInstanceAuthenticationModes[] = ({
  disabled,
  updateConfig,
  resolvedTheme,
}) => [
    ...getBaseAuthenticationModes({ disabled, updateConfig, resolvedTheme }),
    {
      key: "oidc-inofficial",
      name: "OpenID Connect (Inofficial)",
      description: "Authenticate your users via the OpenID Connect protocol.",
      icon: <Image src={OIDCLogo} height={22} width={22} alt="OIDC Logo" />,
      config: <OpenIDConnectConfiguration disabled={disabled} updateConfig={updateConfig} />,
    },
    {
      key: "oidc",
      name: "OIDC (Official)",
      description: "Authenticate your users via the OpenID Connect protocol.",
      icon: <Image src={OIDCLogo} height={22} width={22} alt="OIDC Logo" />,
      config: <UpgradeButton />,
      unavailable: true,
    },
    {
      key: "saml",
      name: "SAML (Official)",
      description: "Authenticate your users via the Security Assertion Markup Language protocol.",
      icon: <Image src={SAMLLogo} height={22} width={22} alt="SAML Logo" className="pl-0.5" />,
      config: <UpgradeButton />,
      unavailable: true,
    },
  ];

export const AuthenticationModes: React.FC<TAuthenticationModeProps> = observer((props) => {
  const { disabled, updateConfig } = props;
  // next-themes
  const { resolvedTheme } = useTheme();

  return (
    <>
      {getAuthenticationModes({ disabled, updateConfig, resolvedTheme }).map((method) => (
        <AuthenticationMethodCard
          key={method.key}
          name={method.name}
          description={method.description}
          icon={method.icon}
          config={method.config}
          disabled={disabled}
          unavailable={method.unavailable}
        />
      ))}
    </>
  );
});
