export default () =>
{
    return (
        <>
        
        <footer>

            {/* Footer with tailwind css */}
            <div className="flex flex-col items-center justify-center h-32">
                <div className="w-full max-w-sm">
                    <div className="flex flex-col items-center justify-center">
                        {/* Copyright & Github repo */}
                        <div>
                            © 2020-{(new Date()).getFullYear()} Tolfix &bull; <a className="text-green-700 hover:text-green-600" target="_blank" href="https://github.com/Tolfix/tlx.tf">Source at Github</a>
                        </div>
                    </div>
                </div>
            </div>


        </footer>
        
        </>
    )
}