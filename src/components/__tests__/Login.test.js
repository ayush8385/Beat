import { render, screen } from "@testing-library/react"
import Login from "../Login/Login"

test("Login Loaded", ()=> {
    render(<Login/>);
    const heading = screen.getByRole("heading")
    expect(heading).toBeInTheDocument();
})