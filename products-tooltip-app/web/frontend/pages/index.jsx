import {
  Card,
  Page,
  TextContainer,
  Image,
  Stack,
  Heading,
} from "@shopify/polaris";

import { trophyImage } from "../assets";

export default function HomePage() {
  return (
    <Page narrowWidth>
      <Card sectioned>
        <Stack
          wrap={false}
          spacing="none"
          distribution="center"
          alignment="center"
        >
          <TextContainer spacing="loose">
            <Heading>Nice work on Shopify store products 🎉</Heading>
          </TextContainer>
          <div style={{ padding: "0 20px" }}>
            <Image
              source={trophyImage}
              alt="Nice work on Shopify store products"
              width={120}
            />
          </div>
        </Stack>
      </Card>
    </Page>
  );
}
