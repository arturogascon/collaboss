"use client";
import { useState, ChangeEvent, useActionState } from "react";
import Button from "@/app/components/buttons/Button";
import Input from "@/app/components/inputs/Input";
import ErrorBanner from "@/app/components/banners/ErrorBanner";
import SuccessBanner from "@/app/components/banners/SuccessBanner";
import {
  updateProfile,
  changePassword,
} from "@/app/utils/serverActions/authActions";
import { initialState } from "@/app/utils/types/serverActions.types";
import {
  UpdateProfileSchema,
  UpdateProfileFormKey,
  UPDATE_PROFILE_FIELD_NAMES,
  UpdatePasswordBaseSchema,
  UpdatePasswordFormKey,
  UPDATE_PASSWORD_FIELD_NAMES,
} from "@/app/schemas/user.schema";

type Props = {
  username: string;
  email: string;
};

const halfWidthFieldClassName = "md:flex-1";
const sectionTitleClassName = "font-heading text-lg font-bold text-brand-ink";

export default function ProfileForms({ username, email }: Props) {
  const initial = username.trim().charAt(0).toUpperCase() || "?";

  const [profileState, profileFormAction, isProfilePending] = useActionState(
    updateProfile,
    initialState,
  );

  const [profileLiveErrors, setProfileLiveErrors] = useState<
    Partial<Record<UpdateProfileFormKey, string>>
  >({});
  const [profileTouched, setProfileTouched] = useState<
    Partial<Record<UpdateProfileFormKey, string>>
  >({});

  const isProfileFormField = (name: string): name is UpdateProfileFormKey =>
    name in UpdateProfileSchema.shape;

  const handleProfileValueChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (!isProfileFormField(name)) return;

    const fieldSchema = UpdateProfileSchema.shape[name];
    const result = fieldSchema.safeParse(value);

    setProfileTouched((prev) => ({
      ...prev,
      [name]:
        value.trim() !== "" &&
        value.trim() !== (name === "username" ? username : email),
    }));

    setProfileLiveErrors((prev) => ({
      ...prev,
      [name]: result.success ? "" : result.error.issues[0].message,
    }));
  };

  const isProfileFormEnabled =
    !isProfilePending &&
    UPDATE_PROFILE_FIELD_NAMES.every((field) => !profileLiveErrors[field]) &&
    UPDATE_PROFILE_FIELD_NAMES.some((field) => profileTouched[field]);

  const [passwordState, passwordFormAction, isPasswordPending] = useActionState(
    changePassword,
    initialState,
  );
  const [passwordLiveErrors, setPasswordLiveErrors] = useState<
    Partial<Record<UpdatePasswordFormKey, string>>
  >({});
  const [passwordTouched, setPasswordTouched] = useState<
    Partial<Record<UpdatePasswordFormKey, string>>
  >({});
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [doesPasswordsMatch, setDoesPasswordsMatch] = useState<boolean>(true);
  const [isNewPasswordSameAsCurrent, setIsNewPasswordSameAsCurrent] =
    useState<boolean>(false);

  const isPasswordFormField = (name: string): name is UpdatePasswordFormKey =>
    name in UpdatePasswordBaseSchema.shape;

  const isValidNewPassword =
    newPassword && !passwordLiveErrors.password && !isNewPasswordSameAsCurrent;

  const handlePasswordValueChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (!isPasswordFormField(name)) return;

    const fieldSchema = UpdatePasswordBaseSchema.shape[name];
    const result = fieldSchema.safeParse(value);

    setPasswordTouched((prev) => ({ ...prev, [name]: value.trim() !== "" }));

    if (name === "current_password") {
      setCurrentPassword(value);
      setIsNewPasswordSameAsCurrent(value !== "" && value === newPassword);
    }

    if (name === "password") {
      setNewPassword(value);
      setIsNewPasswordSameAsCurrent(value !== "" && value === currentPassword);
    }

    if (name === "re_password") {
      setDoesPasswordsMatch(value === newPassword);
    }

    setPasswordLiveErrors((prev) => ({
      ...prev,
      [name]: result.success ? "" : result.error.issues[0].message,
    }));
  };

  const isPasswordFormEnabled =
    UPDATE_PASSWORD_FIELD_NAMES.every(
      (field) => passwordTouched[field] && !passwordLiveErrors[field],
    ) &&
    doesPasswordsMatch &&
    !isNewPasswordSameAsCurrent &&
    !isPasswordPending;

  return (
    <div className="flex min-h-screen justify-center bg-brand-canvas px-5 pt-12 pb-16 md:px-[100px] md:pb-[100px] md:pt-20">
      <div className="flex w-full flex-col gap-8 rounded-3xl border-2 border-brand-outline bg-white p-6 shadow-[0_10px_20px_rgba(0,0,0,0.094)] md:w-[640px] md:p-10">
        <div className="flex w-full flex-col items-center gap-3 md:flex-row md:gap-4">
          <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full border-2 border-white bg-brand-coral md:h-16 md:w-16">
            <span className="font-heading text-[28px] font-bold text-white md:text-[26px]">
              {initial}
            </span>
          </div>
          <div className="flex flex-col items-center gap-0.5 md:items-start">
            <p className="font-heading text-xl font-bold text-brand-ink">
              {username}
            </p>
            <p className="font-body text-sm font-medium text-brand-ink-soft">
              {email}
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-brand-border" />

        <div className="flex w-full flex-col gap-5">
          <h3 className={sectionTitleClassName}>Edit Profile</h3>

          {profileState.error && <ErrorBanner message={profileState.error} />}
          {profileState.message && (
            <SuccessBanner message={profileState.message} />
          )}

          <form action={profileFormAction} className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 md:flex-row md:gap-6">
              <Input
                label="Username:"
                type="text"
                name="username"
                defaultValue={username}
                onChange={handleProfileValueChange}
                error={profileLiveErrors.username}
                wrapperClassName={halfWidthFieldClassName}
              />

              <Input
                label="Email:"
                type="email"
                name="email"
                defaultValue={email}
                onChange={handleProfileValueChange}
                error={profileLiveErrors.email}
                wrapperClassName={halfWidthFieldClassName}
              />
            </div>

            <div className="flex md:justify-end">
              <Button
                className="w-full md:w-fit"
                type="submit"
                disabled={!isProfileFormEnabled}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>

        <div className="h-px w-full bg-brand-border" />

        <div className="flex w-full flex-col gap-5">
          <h3 className={sectionTitleClassName}>Change Password</h3>

          {passwordState.error && <ErrorBanner message={passwordState.error} />}
          {passwordState.message && (
            <SuccessBanner message={passwordState.message} />
          )}

          <form action={passwordFormAction} className="flex flex-col gap-5">
            <Input
              label="Current Password:"
              type="password"
              name="current_password"
              onChange={handlePasswordValueChange}
              error={passwordLiveErrors.current_password}
            />

            <div className="flex flex-col gap-5 md:flex-row md:gap-6">
              <Input
                label="New Password:"
                type="password"
                name="password"
                onChange={handlePasswordValueChange}
                error={
                  passwordLiveErrors.password ||
                  (isNewPasswordSameAsCurrent &&
                    "New password must be different from current password")
                }
                wrapperClassName={halfWidthFieldClassName}
              />

              <Input
                label="Confirm New Password:"
                type="password"
                name="re_password"
                onChange={handlePasswordValueChange}
                disabled={!isValidNewPassword}
                error={!doesPasswordsMatch && "Passwords does not match"}
                wrapperClassName={halfWidthFieldClassName}
              />
            </div>

            <div className="flex md:justify-end">
              <Button
                className="w-full md:w-fit"
                type="submit"
                disabled={!isPasswordFormEnabled}
              >
                Update Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
