import Layout from "@components/layouts/admin";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateSliderForm from "@components/slider/slider-form";

export default function CreateSliderPage() {
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          Create new slider 
        </h1>
      </div>
      <CreateOrUpdateSliderForm />
    </>
  );
}
CreateSliderPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
