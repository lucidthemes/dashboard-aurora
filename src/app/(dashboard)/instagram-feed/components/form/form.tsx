'use client';

import { Controller, useWatch } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
  FieldLegend,
  FieldError,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { InstagramFeedForm } from '@/schemas/instagram-feed.schema';
import { useInstagramFeedStore } from '@/store/instagram-feed-store';

import InstagramFeedFormImages from './images';
import InstagramFeedFormMedia from './media';

export default function InstagramFeedForm({
  form,
  onSubmit,
  formType,
  formId,
}: {
  form: UseFormReturn<InstagramFeedForm>;
  onSubmit: (data: InstagramFeedForm) => Promise<void>;
  formType: 'create' | 'edit';
  formId: string;
}) {
  const { editData } = useInstagramFeedStore();

  const showButtonFields = useWatch({
    control: form.control,
    name: 'button.enabled',
  });

  return (
    <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-7.5">
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input {...field} id="name" aria-invalid={fieldState.invalid} placeholder="Name" autoComplete="off" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <Tabs defaultValue="images" className="gap-y-5">
          <TabsList>
            <TabsTrigger value="images" className="cursor-pointer">
              Images
            </TabsTrigger>
            <TabsTrigger value="settings" className="cursor-pointer">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="images">
            <InstagramFeedFormImages formType={formType} feedId={editData?.id} />
            <InstagramFeedFormMedia />
          </TabsContent>

          <TabsContent value="settings">
            <FieldGroup>
              <Controller
                name="layout.gap"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="layout.gap">Gap</FieldLabel>
                    <Input
                      {...field}
                      id="layout.gap"
                      type="number"
                      min={0}
                      step={0.1}
                      aria-invalid={fieldState.invalid}
                      value={field.value ?? ''}
                      placeholder="Gap"
                      onChange={(e) => {
                        const value = e.target.valueAsNumber;
                        field.onChange(Number.isNaN(value) ? undefined : value);
                      }}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="layout.aspectRatio"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="layout.aspectRatio">Aspect ratio</FieldLabel>
                    <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="cursor-pointer">
                        <SelectValue placeholder="Choose ratio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="square" className="cursor-pointer">
                            Square
                          </SelectItem>
                          <SelectItem value="portrait" className="cursor-pointer">
                            Portrait
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <FieldSeparator />

              <FieldSet>
                <FieldLegend>Posts</FieldLegend>
                <FieldDescription>Number of post shown on each screen size.</FieldDescription>
                <FieldGroup>
                  <div className="flex flex-col gap-y-4">
                    <Controller
                      name="layout.desktopPosts"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <div className="grid grid-cols-2">
                            <FieldLabel htmlFor="layout.desktopPosts">Desktop</FieldLabel>
                            <Input
                              {...field}
                              id="layout.desktopPosts"
                              type="number"
                              min={1}
                              aria-invalid={fieldState.invalid}
                              value={field.value ?? ''}
                              onChange={(e) => {
                                const value = e.target.valueAsNumber;
                                field.onChange(Number.isNaN(value) ? undefined : value);
                              }}
                            />
                          </div>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                    <Controller
                      name="layout.tabletPosts"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <div className="grid grid-cols-2">
                            <FieldLabel htmlFor="layout.tabletPosts">Tablet</FieldLabel>
                            <Input
                              {...field}
                              id="layout.tabletPosts"
                              type="number"
                              min={1}
                              aria-invalid={fieldState.invalid}
                              value={field.value ?? ''}
                              onChange={(e) => {
                                const value = e.target.valueAsNumber;
                                field.onChange(Number.isNaN(value) ? undefined : value);
                              }}
                            />
                          </div>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                    <Controller
                      name="layout.mobilePosts"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <div className="grid grid-cols-2">
                            <FieldLabel htmlFor="layout.mobilePosts">Mobile</FieldLabel>
                            <Input
                              {...field}
                              id="layout.mobilePosts"
                              type="number"
                              min={1}
                              aria-invalid={fieldState.invalid}
                              value={field.value ?? ''}
                              onChange={(e) => {
                                const value = e.target.valueAsNumber;
                                field.onChange(Number.isNaN(value) ? undefined : value);
                              }}
                            />
                          </div>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </div>
                </FieldGroup>
              </FieldSet>

              <FieldSeparator />

              <FieldSet>
                <FieldLegend>Columns</FieldLegend>
                <FieldDescription>Number of columns on each screen size.</FieldDescription>
                <FieldGroup>
                  <div className="flex flex-col gap-y-4">
                    <Controller
                      name="layout.desktopColumns"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <div className="grid grid-cols-2">
                            <FieldLabel htmlFor="layout.desktopColumns">Desktop</FieldLabel>
                            <Input
                              {...field}
                              id="layout.desktopColumns"
                              type="number"
                              min={1}
                              max={10}
                              aria-invalid={fieldState.invalid}
                              value={field.value ?? ''}
                              onChange={(e) => {
                                const value = e.target.valueAsNumber;
                                field.onChange(Number.isNaN(value) ? undefined : value);
                              }}
                            />
                          </div>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                    <Controller
                      name="layout.tabletColumns"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <div className="grid grid-cols-2">
                            <FieldLabel htmlFor="layout.tabletColumns">Tablet</FieldLabel>
                            <Input
                              {...field}
                              id="layout.tabletColumns"
                              type="number"
                              min={1}
                              max={10}
                              aria-invalid={fieldState.invalid}
                              value={field.value ?? ''}
                              onChange={(e) => {
                                const value = e.target.valueAsNumber;
                                field.onChange(Number.isNaN(value) ? undefined : value);
                              }}
                            />
                          </div>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                    <Controller
                      name="layout.mobileColumns"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <div className="grid grid-cols-2">
                            <FieldLabel htmlFor="layout.mobileColumns">Mobile</FieldLabel>
                            <Input
                              {...field}
                              id="layout.mobileColumns"
                              type="number"
                              min={1}
                              max={10}
                              aria-invalid={fieldState.invalid}
                              value={field.value ?? ''}
                              onChange={(e) => {
                                const value = e.target.valueAsNumber;
                                field.onChange(Number.isNaN(value) ? undefined : value);
                              }}
                            />
                          </div>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </div>
                </FieldGroup>
              </FieldSet>

              <FieldSeparator />

              <FieldSet>
                <FieldLegend>Button</FieldLegend>
                <FieldDescription>Show or hide the follow button</FieldDescription>
                <FieldGroup>
                  <div className="flex flex-col gap-y-4">
                    <Controller
                      name="button.enabled"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <FieldSet data-invalid={fieldState.invalid}>
                          <FieldGroup>
                            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                              <Checkbox
                                id="button.enabled"
                                name="button.enabled"
                                className="cursor-pointer"
                                aria-invalid={fieldState.invalid}
                                checked={field.value}
                                onCheckedChange={(checked) => {
                                  const newValue = checked;

                                  field.onChange(newValue);
                                }}
                              />
                              <FieldLabel htmlFor="button.enabled" className="cursor-pointer font-normal">
                                Show button
                              </FieldLabel>
                            </Field>
                          </FieldGroup>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </FieldSet>
                      )}
                    />
                    {showButtonFields && (
                      <>
                        <Controller
                          name="button.link"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <div className="grid grid-cols-2">
                                <FieldLabel htmlFor="button.link">Link</FieldLabel>
                                <Input
                                  {...field}
                                  id="button.link"
                                  type="url"
                                  aria-invalid={fieldState.invalid}
                                  placeholder="Link"
                                  autoComplete="off"
                                />
                              </div>
                              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                          )}
                        />
                        <Controller
                          name="button.text"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <div className="grid grid-cols-2">
                                <FieldLabel htmlFor="button.text">Text</FieldLabel>
                                <Input
                                  {...field}
                                  id="button.text"
                                  type="text"
                                  min={0}
                                  aria-invalid={fieldState.invalid}
                                  placeholder="Text"
                                  autoComplete="off"
                                />
                              </div>
                              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                          )}
                        />
                      </>
                    )}
                  </div>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </TabsContent>
        </Tabs>
      </div>
    </form>
  );
}
