"use client"

import React, { useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"

interface ModalProps {
  title: string,
  onClose: () => void,
  onOk: () => void,
  children: React.ReactNode
}

const Modal = ({ title, onClose, onOk, children }: ModalProps) => {
  const searchParams = useSearchParams()
  const showModal = searchParams.get("showModal")
  const modalRef = useRef<null | HTMLDialogElement>(null)

  useEffect(() => {
    if (showModal === "y") {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  }, [showModal])

  const closeModal = () => {
    modalRef.current?.close()
    onClose()
  }

  const clickOk = () => {
    onOk()
    closeModal()
  }

  const modal = showModal === "y"
    ? (
      <dialog ref={modalRef} className="fixed top-[50%] left-[50%] z-10 -translate-x-[50%] -translate-y-[50%] rounded-xl backdrop:bg-gray-800/50">
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button onClick={closeModal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span onClick={closeModal} className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to <span className="text-red-600 font-semibold underline uppercase">delete</span> this project?
              </h3>
              <button onClick={clickOk} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Yes, I&apos;m sure
              </button>
              <button onClick={closeModal} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
            </div>
          </div>
        </div>
      </dialog>
    ) : null

  return modal
}

export default Modal