import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";
import { useEffect, useState } from 'react';

export const AblyClientProvider = (props: any) => {
    const [ablyKey, setAblyKey] = useState<string>()
    const getSecretValue = async (secretName = "ABLY_KEY") => {
        const client = new SecretsManagerClient();
        const response = await client.send(
          new GetSecretValueCommand({
            SecretId: secretName,
          }),
        );
        console.log("resp", response);
      
        if (response.SecretString) {
          setAblyKey(response.SecretString ? response.SecretString : '');
        }
      
        if (response.SecretBinary) {
          return response.SecretBinary;
        }
      };
    useEffect(() => {
        console.log("getting key", ablyKey)
        getSecretValue('ABLY_KEY')
        console.log("got key", ablyKey)
    }, [])

    const ablyClient = new Ably.Realtime({ key: ablyKey });
        console.log("client", ablyClient)
    return (
        <AblyProvider client={ablyClient}> 
            {props.children}
        </AblyProvider>
    )
}