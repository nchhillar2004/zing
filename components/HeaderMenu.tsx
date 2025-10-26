    const handleLogout = async () => {
        toast.promise<{message: string}>(
            () => new Promise((resolve, reject) => {
                logout().then(res => {
                    if (res?.success) {
                        resolve({message: res?.message});
                        router.push("/login");
                    }
                    else reject({ message: res?.message });
                })
            }), {
                loading: "Logging out...",
                success: (data) => `${data.message}`,
                error: (data) => `${data.message}`
            }
        );
    };

