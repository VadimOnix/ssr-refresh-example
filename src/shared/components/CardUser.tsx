import {User} from "@nextui-org/react";

type CardUserProps = {
  token?: string;
}

const CardUser = ({token}: CardUserProps) => {
  const imageUrl = token ? "/images/man.png" : "/images/user.png";
  const stringifyToken = token ? token : "undefined"
  return (
    <User
      name="Текущий пользователь"
      description={`Access Token: ${stringifyToken}`}
      avatarProps={{
        src: imageUrl
      }}
    />
  );
};

export default CardUser;
