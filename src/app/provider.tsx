"use client";

import WagmiContextProvider from "@/lib/provider/reown";
import { ThemeProvider } from "@/lib/provider/theme";
import { wagmiAdapter } from "@/lib/web3/wagmi/config";
import { Config, cookieToInitialState } from "wagmi";

interface Props {
  components: Array<
    [
      React.JSXElementConstructor<React.PropsWithChildren<any>>,
      Record<string, any>?
    ]
  >;
  children: React.ReactNode;
}

const Compose = (props: Props) => {
  const { components = [], children } = props;

  return (
    <>
      {components.reduceRight((acc, [Comp, compProps = {}]) => {
        return <Comp {...compProps}>{acc}</Comp>;
      }, children)}
    </>
  );
};

// Combine all your providers here
const AllProviders = ({ children }: { children: React.ReactNode }) => {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config);

  return (
    <Compose
      components={[
        [
          ThemeProvider,
          {
            attribute: "class",
            defaultTheme: "system",
            enableSystem: true,
            disableTransitionOnChange: true,
          },
        ],
        [WagmiContextProvider, { initialState: initialState }],
      ]}
    >
      {children}
    </Compose>
  );
};

export default AllProviders;
