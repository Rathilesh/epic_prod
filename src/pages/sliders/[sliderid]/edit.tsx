import Layout from "@components/layouts/admin";
import { useRouter } from "next/router";
import CreateOrUpdateSliderForm from "@components/slider/slider-form";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useSliderQuery } from "@data/slider/use-slider.query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function UpdateSliderPage() {
  const { query } = useRouter();
  const { t } = useTranslation();
  const {
    data,
    isLoading: loading,
    error,
  } = useSliderQuery(query?.sliderid as string);
  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          Edit Slider
        </h1>
      </div>
      <CreateOrUpdateSliderForm initialValues={data} />
    </>
  );
}
UpdateSliderPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
