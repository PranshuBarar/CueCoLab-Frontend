function MyAccount(){
    return (
        <button type="button" className="flex flex-row bg-blue-700 rounded-3xl items-center px-4 py-1 text-white text-[12px] hover:bg-blue-900 transition duration-700 hover:scale-110">
            <img src="/dropdowniconblue.svg" alt="Dropdown" className="mr-1 h-4 w-4" />
            My Account
        </button>
    )
}

export default MyAccount;