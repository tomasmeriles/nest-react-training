export interface GenericFormInput<OnSubmitData> {
  onSubmit: (data: OnSubmitData) => void;
}
