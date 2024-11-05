import { ThemeProvider } from "@/components/theme-provider";

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
      ]}
    >
      {children}
    </Compose>
  );
};

export default AllProviders;
