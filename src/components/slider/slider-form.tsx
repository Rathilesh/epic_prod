import Input from "@components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import Button from "@components/ui/button";
import Description from "@components/ui/description";
import Card from "@components/common/card";
import { useRouter } from "next/router";
import Label from "@components/ui/label";
import {
  Attachment,
  Slider,
  TypeSettingsInput
} from "@ts-types/generated";
import { useCreateSliderMutation } from "@data/slider/use-slider-create.mutation";
import { useUpdateSliderMutation } from "@data/slider/use-slider-update.mutation";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { sliderValidationSchema } from "./slider-validation-schema";
import SelectInput from "@components/ui/select-input";
import Alert from "@components/ui/alert";
import FileInput from "@components/ui/file-input";
import ValidationError from "@components/ui/form-validation-error";


const keyBasedImages = [
  {
    id: 1,
    value: 'grid-layout',
    label: 'Grid Layout',
  },

  {
    id: 2,
    value: 'slider-layout',
    label: 'Slider Layout'
  }
];

export const updateImages = keyBasedImages.map((item: any) => {
  item.label = (
    <div className="flex space-s-5 items-center">
      <span>{item.label}</span>
    </div>
  );
  return item;
});

type FormValues = {
  name?: string | null;
  images: [{
    key: {},
    image: [Attachment]
  }]
};

type IProps = {
  initialValues?: Slider | null;
};
export default function CreateOrUpdateSliderForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    // @ts-ignore
    resolver: yupResolver(sliderValidationSchema),
    // @ts-ignore
    defaultValues: {
      ...initialValues,
      images: initialValues?.images?.map((item: any) => {
        return {
          key: keyBasedImages.find(key => item?.key === key.value),
          image: item?.image?.map((singleImage: Attachment) => ({
            id: singleImage?.id,
            original: singleImage?.original,
            thumbnail: singleImage?.thumbnail
          }))
        }
      })
    },
  });

  const { fields, append: sliderImageAppend, remove } = useFieldArray({
    control,
    name: "images",
  });

  const { mutate: createSlider, isLoading: creating } = useCreateSliderMutation();
  const { mutate: updateSlider, isLoading: updating } = useUpdateSliderMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      name: values.name!,
      images: values.images?.map((item: any) => {
        return {
          key: item?.key?.value,
          image: item?.image?.map((singleImage: Attachment) => ({
            id: singleImage?.id,
            original: singleImage?.original,
            thumbnail: singleImage?.thumbnail
          }))
        }
      })
    };

    if (!initialValues) {
      createSlider({
        variables: {
          input,
        },
      });
    } else {
      updateSlider({
        variables: {
          id: initialValues.id!,
          input,
        },
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t("form:item-description")}
          details={`${
            initialValues
              ? t("form:item-description-update")
              : t("form:item-description-add")
          }  your slider description and necessary information from here`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t("form:input-label-name")}
            {...register("name")}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
          />

        </Card>
      </div>

      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title='Slider Images'
          details={'Add your slider images for different layout'}
          className="w-full px-0 sm:pr-4 md:pr-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div>
            {fields.map((item: any & { id: string }, index: number) => (
              <div
                className="border-b border-dashed border-border-200 last:border-0 py-5 md:py-8 first:pt-0"
                key={item.id}
              >
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-5">
                  <div className="grid grid-cols-1 gap-5 sm:col-span-4">
                    <Label className="whitespace-nowrap">
                      {t("form:input-label-select-layout")}
                    </Label>
                    <SelectInput
                      name={`images.${index}.key` as const}
                      control={control}
                      options={updateImages}
                      isClearable={false}
                    />
                    <ValidationError message={t(errors.images?.[index]?.key?.message)}/>

                    <div>
                      <FileInput name={`images.${index}.image` as const} control={control} multiple={true}/>
                      <ValidationError message={t(errors.images?.[index]?.image?.message)}/>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      remove(index);
                    }}
                    type="button"
                    className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none sm:mt-4 sm:col-span-1"
                  >
                    {t("form:button-label-remove")}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Button
            type="button"
            onClick={() => sliderImageAppend({ key: { ...keyBasedImages[0] }, image: [] })}
            className="w-full sm:w-auto"
          >
            Add new image layout
          </Button>

          {errors?.images?.message ? (
            <Alert
              message={t(errors?.images?.message)}
              variant="error"
              className="mt-5"
            />
          ) : null}
        </Card>
      </div>

      <div className="mb-4 text-end">
        {initialValues && (
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            {t("form:button-label-back")}
          </Button>
        )}

        <Button loading={creating || updating}>
          {initialValues
            ? 'Update Slider'
            : 'Create Slider'}
        </Button>
      </div>
    </form>
  );
}