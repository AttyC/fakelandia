export type ReasonForContact =
  | 'NOT_SELECTED'
  | 'rudeness'
  | 'lift'
  | 'vegetables'
  | 'united'
  | 'talk';

export type ContactFormData = {
  subject: string;
  reasonForContact: ReasonForContact;
  message: string;
};

export type ContactFormChangeHandler = <TKey extends keyof ContactFormData>(
  value: ContactFormData[TKey],
  name: TKey
) => void;
