export const OriginExtract = (origin) => {
  if(origin.includes("lazada"))
    return "Lazada"
  else if(origin.includes("amazon"))
    return "Amazon"
}

export const walletFormatAddress = ({
  address,
}: {
  address: string;
}) => {
  console.log("Address passed in: ", address)
  const prefix = address.slice(0, 6);
  const suffix = address.slice(-4);
  const middle = "...";
  return `${prefix}${middle}${suffix}`;
};
