export const GenericBtn = ({
  inverted = false,
  onClick,
  children,
}:
  {
    inverted?: boolean,
    onClick: () => Promise<void>,
    children: React.ReactChild
  }) =>
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white ${!inverted ? "bg-slate-600" : "bg-slate-600"} hover:bg-slate-500 md:py-4 md:text-lg md:px-10 m-1`}>
    {children}
  </button>

export const OperationBtn = ({ onClick, children }: { onClick: () => void, children: React.ReactChild }) =>
  <button
    onClick={onClick}
    className="w-full flex items-center justify-center px-8 py-3 border border-transparent
        text-base font-medium rounded-md text-white bg-cyan-900 hover:bg-cyan-800 md:py-4 md:text-lg md:px-10 m-1">
    <span className="text-2xl">
    {children}
    </span>
  </button>

export const BoxContainer = ({ children }: { children: React.ReactChild }) =>
  <div className="shadow sm:rounded-md sm:overflow-hidden x-4 py-5p bg-white space-y-6 sm:p-6">
    {children}
  </div>
