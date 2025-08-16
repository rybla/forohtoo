import z from "zod";

const envSchema = z.object({
    SENDER_PRIVATE_KEY: z.string(),
    RECEIVER_ADDRESS: z.string().transform((s, ctx) => {
        if (!s.startsWith("0x"))
            throw new z.ZodError([
                {
                    path: ["RECEIVER_ADDRESS"],
                    code: "custom",
                    message: "Invalid address",
                } as const,
            ]);
        return s as `0x${string}`;
    }),
});

export const env = envSchema.parse(process.env);
export default env;
