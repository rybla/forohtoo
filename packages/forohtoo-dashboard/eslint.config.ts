import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import tseslint, { ConfigArray } from "typescript-eslint";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig: ConfigArray = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    ...tseslint.configs.strictTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: "./"
            }
        }
    }
];

export default eslintConfig;
