import { Dialog, Transition } from "@headlessui/react";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useLocation, useNavigate } from "@remix-run/react";
import { Fragment, useEffect, useState } from "react";
import i18next from "~/i18next.server";

type LoaderData = { locale: string; page: string };

export let loader: LoaderFunction = async ({ request, params }) => {
  let locale = await i18next.getLocale(request);
  return json<LoaderData>({ locale, page: params.book! });
};

export default function MyModal() {
  const { page } = useLoaderData<LoaderData>();
  let [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => openModal(), [location.pathname]);

  function closeModal() {
    console.log("closeModal");
    navigate(-1);
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Dialog as="div" className="relative z-10" open={true} onClose={closeModal}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                {page.toUpperCase()}
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Your payment has been successfully submitted. We’ve sent you an email with all of the details of your
                  order.
                </p>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={closeModal}
                >
                  Got it, thanks!
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
