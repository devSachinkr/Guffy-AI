import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import clsx from "clsx";
import { Star } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  price: string;
  duration: string;
  highlight: string;
  features: Array<string>;
};

const SubscriptionCard = ({
  description,
  duration,
  features,
  highlight,
  price,
  title,
}: Props) => {
  return (
    <Card
      className={clsx("w-[300px] flex flex-col justify-between m-3", {
        "border-2 border-primary": title === "Ultimate",
      })}
    >
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-muted-foreground">/m</span>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        {features.map((f) => (
          <div key={f} className="flex items-center justify-start gap-x-2">
            <Star size={18} />
            <span>{f}</span>
          </div>
        ))}
        <Link href={`/?plan=${title}`} className="p-3 w-full  text-end">
          Enroll Now {"->"}
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCard;
